"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentVerifyPage() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center space-y-8 bg-card border border-border rounded-xl shadow-lg p-8 sm:p-12 max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            delay: 0.2,
          }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-xl animate-pulse" />
          <CheckCircle2
            size={96}
            className="text-green-500 dark:text-green-400 relative mx-auto"
          />
        </motion.div>

        <div className="space-y-3">
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Congratulations!
            </h1>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </motion.div>

          <motion.h2
            className="text-2xl text-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your Subscription is Active
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            You&apos;ve successfully joined Bubblspace. Your AI journey begins
            now!
          </motion.p>
        </div>

        <motion.div
          className="pt-4 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 transition-all duration-200"
          >
            <Link
              href="/bubblspace/create/new"
              className="flex items-center gap-2"
            >
              Create Your Bubblspace <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border hover:bg-secondary px-8 py-6 transition-all duration-200"
          >
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Need help getting started?{" "}
          <Link href="/help" className="text-primary hover:underline">
            Check our guides
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
