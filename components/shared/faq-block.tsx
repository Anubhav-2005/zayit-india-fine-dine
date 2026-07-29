import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

type FaqBlockProps = {
  entries?: typeof faqs;
};

export function FaqBlock({ entries = faqs }: FaqBlockProps) {
  return (
    <Accordion type="single" collapsible className="border-t border-foreground/20">
      {entries.map((item, index) => (
        <AccordionItem value={`faq-${index + 1}`} key={item.question}>
          <AccordionTrigger>
            <span className="mr-2 text-[0.58rem] font-semibold tracking-[0.13em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
