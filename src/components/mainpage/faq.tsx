import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  return (
    <section className="dark:bg-darkBg bg-bg py-20 font-base lg:py-[100px]">
      <h2 className="mb-10 text-center text-2xl  md:text-3xl lg:mb-15 lg:text-5xl [text-shadow:_-1.10px_-1.10px_0_#000,_1.10px_-1.10px_0_#000,_-1.10px_1.10px_0_#000,_1.10px_1.10px_0_#000]">
        Frequently asked questions
      </h2>
      <div className="mx-auto grid w-[700px] max-w-full px-5">
        <div className="text-base sm:text-lg " data-orientation="vertical">
          <Accordion
            type="single"
            collapsible
            className="w-full mx-auto  space-y-4 max-w-xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-[#EED9E5]">
                What is DeProbo?
              </AccordionTrigger>
              <AccordionContent>
                DeProbo is a decentralized prediction market platform where
                users can create, participate in, and resolve prediction-based
                questions transparently using blockchain technology.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="bg-[#EED9E5]">
                How does DeProbo ensure fairness?
              </AccordionTrigger>
              <AccordionContent>
                DeProbo leverages smart contracts to automate market creation,
                bet placement, and payout distribution, ensuring that outcomes
                are tamper-proof and fully transparent to all participants.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="bg-[#EED9E5]">
                Is my money secure with DeProbo?
              </AccordionTrigger>
              <AccordionContent>
                Yes. All funds are held securely within decentralized smart
                contracts. Users retain custody of their assets until market
                resolution, eliminating third-party risk.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="bg-[#EED9E5]">
                Who can create prediction markets?
              </AccordionTrigger>
              <AccordionContent>
                Any registered user can create a prediction market on DeProbo,
                subject to community guidelines and smart contract rules to
                maintain quality and prevent misuse.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
