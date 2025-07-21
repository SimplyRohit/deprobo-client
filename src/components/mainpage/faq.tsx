import { faqs } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  return (
    <section className="dark:bg-darkBg bg-bg py-20 font-base lg:py-[100px] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <h2 className="mb-10 text-center text-2xl md:text-3xl lg:mb-15 lg:text-5xl">
        Frequently asked questions
      </h2>
      <div className="mx-auto grid w-[700px] max-w-full px-5">
        <div className="text-base sm:text-lg" data-orientation="vertical">
          <Accordion
            type="single"
            collapsible
            className="w-full mx-auto space-y-4 max-w-xl"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="">{faq.question}</AccordionTrigger>
                <AccordionContent className="">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
