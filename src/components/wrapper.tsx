export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  max-w-[100rem]  mx-auto">{children}</div>
  );
}
