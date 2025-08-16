#!/usr/bin/env python3
"""
PDF Table Extractor Script

This script extracts tables from PDF files using pdfplumber and camelot.
It outputs structured table data in JSON format that can be consumed by Node.js.

Requirements:
    pip install pdfplumber camelot-py[base] pandas opencv-python
"""

import sys
import json
import argparse
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional
import tempfile
import os

try:
    import pdfplumber
    import camelot
    import pandas as pd
except ImportError as e:
    print(json.dumps({
        "error": f"Required Python packages not installed: {e}",
        "suggestion": "Install with: pip install pdfplumber camelot-py[base] pandas opencv-python"
    }))
    sys.exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PDFTableExtractor:
    def __init__(self):
        self.extracted_tables = []
        self.text_content = ""
        self.metadata = {}
    
    def extract_with_pdfplumber(self, pdf_path: str) -> List[Dict[str, Any]]:
        """Extract tables using pdfplumber - good for simple tables"""
        tables = []
        text_content = ""
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages):
                    # Extract text
                    page_text = page.extract_text() or ""
                    text_content += page_text + "\n"
                    
                    # Extract tables
                    page_tables = page.extract_tables()
                    
                    for table_idx, table in enumerate(page_tables):
                        if table and len(table) > 0:
                            # Clean table data
                            cleaned_table = []
                            for row in table:
                                cleaned_row = []
                                for cell in row:
                                    cell_content = str(cell) if cell is not None else ""
                                    cleaned_row.append({
                                        "content": cell_content.strip(),
                                        "isHeader": False  # We'll determine this later
                                    })
                                cleaned_table.append({"cells": cleaned_row})
                            
                            # Mark first row as header if it looks like one
                            if cleaned_table and self._is_header_row(cleaned_table[0]["cells"]):
                                cleaned_table[0]["isHeader"] = True
                                for cell in cleaned_table[0]["cells"]:
                                    cell["isHeader"] = True
                            
                            table_data = {
                                "rows": cleaned_table,
                                "metadata": {
                                    "pageNumber": page_num + 1,
                                    "tableIndex": table_idx,
                                    "extractionMethod": "pdfplumber",
                                    "confidence": 0.8  # pdfplumber is generally reliable
                                }
                            }
                            
                            tables.append(table_data)
                            
        except Exception as e:
            logger.error(f"Error extracting with pdfplumber: {e}")
            return []
        
        self.text_content = text_content
        return tables
    
    def extract_with_camelot(self, pdf_path: str) -> List[Dict[str, Any]]:
        """Extract tables using camelot - good for complex tables"""
        tables = []
        
        try:
            # Use lattice method for tables with grid lines
            lattice_tables = camelot.read_pdf(pdf_path, pages='all', flavor='lattice')
            
            for table in lattice_tables:
                if table.df is not None and not table.df.empty:
                    df = table.df
                    
                    # Convert DataFrame to our table format
                    rows = []
                    for row_idx, (_, row) in enumerate(df.iterrows()):
                        cells = []
                        for col_value in row:
                            cells.append({
                                "content": str(col_value).strip(),
                                "isHeader": row_idx == 0  # First row as header
                            })
                        rows.append({
                            "cells": cells,
                            "isHeader": row_idx == 0
                        })
                    
                    table_data = {
                        "rows": rows,
                        "metadata": {
                            "pageNumber": table.page,
                            "extractionMethod": "camelot-lattice",
                            "confidence": table.accuracy / 100.0,  # Convert to 0-1 scale
                            "accuracy": table.accuracy,
                            "whitespace": table.whitespace
                        }
                    }
                    
                    tables.append(table_data)
            
            # Try stream method for tables without grid lines
            try:
                stream_tables = camelot.read_pdf(pdf_path, pages='all', flavor='stream')
                
                for table in stream_tables:
                    if table.df is not None and not table.df.empty:
                        # Only add if we haven't already found this table with lattice
                        if not self._is_duplicate_table(table, tables):
                            df = table.df
                            
                            rows = []
                            for row_idx, (_, row) in enumerate(df.iterrows()):
                                cells = []
                                for col_value in row:
                                    cells.append({
                                        "content": str(col_value).strip(),
                                        "isHeader": row_idx == 0
                                    })
                                rows.append({
                                    "cells": cells,
                                    "isHeader": row_idx == 0
                                })
                            
                            table_data = {
                                "rows": rows,
                                "metadata": {
                                    "pageNumber": table.page,
                                    "extractionMethod": "camelot-stream",
                                    "confidence": table.accuracy / 100.0,
                                    "accuracy": table.accuracy
                                }
                            }
                            
                            tables.append(table_data)
                            
            except Exception as e:
                logger.warning(f"Stream method failed: {e}")
                
        except Exception as e:
            logger.error(f"Error extracting with camelot: {e}")
            return []
        
        return tables
    
    def _is_header_row(self, cells: List[Dict[str, Any]]) -> bool:
        """Heuristic to determine if a row is a header"""
        if not cells:
            return False
        
        # Check if cells contain typical header characteristics
        header_indicators = 0
        total_cells = len(cells)
        
        for cell in cells:
            content = cell.get("content", "").lower()
            # Look for common header patterns
            if any(indicator in content for indicator in ["name", "id", "date", "type", "status", "description", "value", "amount", "total"]):
                header_indicators += 1
            # Short, capitalized words are often headers
            if len(content) < 20 and content.isupper():
                header_indicators += 1
        
        # If more than 50% of cells look like headers, mark as header row
        return header_indicators / total_cells > 0.5
    
    def _is_duplicate_table(self, new_table, existing_tables: List[Dict[str, Any]]) -> bool:
        """Check if table is duplicate based on content similarity"""
        if not existing_tables:
            return False
        
        new_df = new_table.df
        if new_df is None or new_df.empty:
            return True
        
        # Simple heuristic: if shape and first few cells match, consider duplicate
        for existing in existing_tables:
            existing_rows = existing.get("rows", [])
            if len(existing_rows) == len(new_df) and len(existing_rows) > 0:
                # Compare first few cells
                if len(existing_rows[0]["cells"]) == len(new_df.columns):
                    matches = 0
                    total_checks = min(3, len(existing_rows[0]["cells"]))
                    
                    for i in range(total_checks):
                        existing_content = existing_rows[0]["cells"][i]["content"]
                        new_content = str(new_df.iloc[0, i]).strip()
                        if existing_content == new_content:
                            matches += 1
                    
                    if matches / total_checks > 0.8:  # 80% similarity
                        return True
        
        return False
    
    def extract_tables(self, pdf_path: str, method: str = "auto") -> Dict[str, Any]:
        """Main extraction method that combines both approaches"""
        result = {
            "tables": [],
            "text": "",
            "metadata": {
                "totalTables": 0,
                "extractionMethods": [],
                "processingTime": 0
            }
        }
        
        if not os.path.exists(pdf_path):
            result["error"] = f"PDF file not found: {pdf_path}"
            return result
        
        import time
        start_time = time.time()
        
        try:
            if method in ["auto", "pdfplumber"]:
                logger.info("Extracting tables with pdfplumber...")
                pdfplumber_tables = self.extract_with_pdfplumber(pdf_path)
                result["tables"].extend(pdfplumber_tables)
                result["metadata"]["extractionMethods"].append("pdfplumber")
                
                # Store text content from pdfplumber
                result["text"] = self.text_content
            
            if method in ["auto", "camelot"]:
                logger.info("Extracting tables with camelot...")
                camelot_tables = self.extract_with_camelot(pdf_path)
                
                # Deduplicate and merge with pdfplumber results
                for table in camelot_tables:
                    if not self._table_already_exists(table, result["tables"]):
                        result["tables"].append(table)
                
                result["metadata"]["extractionMethods"].append("camelot")
            
            result["metadata"]["totalTables"] = len(result["tables"])
            result["metadata"]["processingTime"] = time.time() - start_time
            
            logger.info(f"Successfully extracted {len(result['tables'])} tables")
            
        except Exception as e:
            logger.error(f"Error during table extraction: {e}")
            result["error"] = str(e)
        
        return result
    
    def _table_already_exists(self, new_table: Dict[str, Any], existing_tables: List[Dict[str, Any]]) -> bool:
        """Check if table already exists in results"""
        new_page = new_table.get("metadata", {}).get("pageNumber", 0)
        new_rows = len(new_table.get("rows", []))
        
        for existing in existing_tables:
            existing_page = existing.get("metadata", {}).get("pageNumber", 0)
            existing_rows = len(existing.get("rows", []))
            
            # If same page and similar row count, likely duplicate
            if new_page == existing_page and abs(new_rows - existing_rows) <= 1:
                return True
        
        return False

def main():
    parser = argparse.ArgumentParser(description="Extract tables from PDF files")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("--method", choices=["auto", "pdfplumber", "camelot"], 
                       default="auto", help="Extraction method to use")
    parser.add_argument("--output", help="Output JSON file path")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    extractor = PDFTableExtractor()
    result = extractor.extract_tables(args.pdf_path, args.method)
    
    output_json = json.dumps(result, indent=2, ensure_ascii=False)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output_json)
        logger.info(f"Results saved to {args.output}")
    else:
        print(output_json)

if __name__ == "__main__":
    main()

