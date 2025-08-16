# PDF Table Extraction Enhancement

This enhancement adds advanced table detection and extraction capabilities to the PDF parser, allowing the system to understand and store table formats properly as structured data in chunks.

## Features Added

### 1. Enhanced Chunk Schema

- Extended chunk types to support structured data including tables
- Added table metadata (page numbers, extraction methods, confidence scores)
- Backward compatibility with existing text-only chunks

### 2. Python-based Table Extraction

- **pdfplumber**: For simple, well-structured tables
- **camelot**: For complex tables with grid lines and advanced layouts
- Automatic method selection and fallback mechanisms
- JSON output format for seamless Node.js integration

### 3. Enhanced PDF Parser API

- Hybrid approach: Python for tables + pdf2json for text
- Structured response with both text and table data
- Metadata about extraction methods and success rates
- Error handling and graceful degradation

### 4. Advanced Table Visualization

- Interactive table viewer component with multiple view modes
- Export capabilities (CSV, JSON, HTML, Markdown)
- Copy to clipboard functionality
- Responsive design with proper formatting

### 5. Knowledge Base Integration

- Enhanced document cards showing table count and structured data indicators
- Expandable table views within document previews
- Table metadata display (extraction method, confidence, page numbers)

## Installation & Setup

### 1. Python Dependencies

```bash
# Install Python dependencies for table extraction
pip install -r requirements-pdf-table.txt
```

### 2. System Dependencies (for camelot)

**Ubuntu/Debian:**

```bash
sudo apt-get install ghostscript python3-tk
```

**macOS:**

```bash
brew install ghostscript tcl-tk
```

**Windows:**

- Install Ghostscript from https://www.ghostscript.com/download/gsdnld.html
- Add Ghostscript to your PATH environment variable

### 3. Verify Installation

```bash
# Test the Python table extraction script
python3 scripts/table_extractor.py --help
```

### 4. Test with Sample PDF

```bash
# Extract tables from a sample PDF
python3 scripts/table_extractor.py path/to/your/sample.pdf --method auto --verbose
```

## Usage

### API Changes

The PDF parser API now returns enhanced responses:

**Previous Response:**

```
Content-Type: text/plain
Body: [raw text content]
```

**New Response:**

```json
{
  "text": "Full document text content...",
  "tables": [
    {
      "rows": [
        {
          "cells": [
            {
              "content": "Header 1",
              "isHeader": true,
              "alignment": "left"
            }
          ],
          "isHeader": true
        }
      ],
      "metadata": {
        "pageNumber": 1,
        "extractionMethod": "pdfplumber",
        "confidence": 0.8
      }
    }
  ],
  "metadata": {
    "fileName": "document-id",
    "hasStructuredData": true,
    "tableCount": 2,
    "textLength": 1500,
    "extractionMethods": ["python-tables", "pdf2json-text"]
  }
}
```

### Frontend Integration

Documents with tables now display:

- Table count in document metadata
- "Structured Data" badge
- Interactive table viewer in expanded view
- Export options for individual tables

### Table Viewer Component

```tsx
import { TableViewer } from "@/components/shared/TableViewer";

<TableViewer
  tables={document.tables}
  title="Document Tables"
  showExportOptions={true}
  showMetadata={true}
  maxHeight="400px"
/>;
```

## Configuration Options

### Python Script Options

```bash
python3 scripts/table_extractor.py [PDF_PATH] [OPTIONS]

Options:
  --method {auto,pdfplumber,camelot}  Extraction method (default: auto)
  --output OUTPUT_FILE               Output JSON file path
  --verbose                          Enable verbose logging
```

### Extraction Methods

- **auto**: Try both pdfplumber and camelot, deduplicate results
- **pdfplumber**: Fast, good for simple tables with clear structure
- **camelot**: Advanced, handles complex layouts and merged cells

## Performance Considerations

### Processing Time

- Text-only PDFs: Same performance as before
- PDFs with tables: Additional 5-60 seconds depending on complexity
- Timeout protection: 60 seconds for table extraction

### Memory Usage

- Minimal impact for text processing
- Python subprocess isolated from Node.js memory
- Automatic cleanup of temporary files

### Error Handling

- Graceful fallback to text-only extraction if Python fails
- Detailed error logging for debugging
- Non-blocking: table extraction failure doesn't prevent text extraction

## Troubleshooting

### Common Issues

**1. Python script not found**

```
Error: Failed to start table extraction: spawn python3 ENOENT
```

Solution: Ensure Python 3 is installed and accessible as `python3`

**2. Ghostscript not found (camelot)**

```
Error: Ghostscript not found
```

Solution: Install Ghostscript and add to PATH

**3. Permission denied on temporary files**

```
Error: EACCES: permission denied, open '/tmp/...'
```

Solution: Check temp directory permissions or set TEMP environment variable

**4. Table extraction timeout**

```
Warning: Table extraction timeout after 60 seconds
```

Solution: Large/complex PDFs may timeout, but text extraction continues

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Test extraction with verbose output
python3 scripts/table_extractor.py sample.pdf --verbose --output debug_output.json
```

## Supported Table Formats

### Well-Supported

- ✅ Tables with clear grid lines
- ✅ Simple row/column structures
- ✅ Tables with headers
- ✅ Multi-page tables
- ✅ Tables with merged cells (camelot)

### Partially Supported

- ⚠️ Tables without borders (depends on spacing)
- ⚠️ Rotated tables (may require manual processing)
- ⚠️ Tables with complex nested structures

### Not Supported

- ❌ Tables in images (requires OCR)
- ❌ Hand-drawn or sketched tables
- ❌ Tables split across non-consecutive pages

## Future Enhancements

- OCR-based table extraction for image tables
- AI-powered table structure recognition
- Real-time table editing capabilities
- Advanced table merging and transformation tools

## Contributing

To improve table extraction:

1. Test with diverse PDF formats
2. Report extraction quality issues
3. Contribute new extraction methods
4. Enhance visualization components

