import PrimaryLink from "@/components/PrimaryLink";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className='h-[75%] flex text-center items-center justify-center flex-col w-[95%]'>
        <h1 className="text-4xl mb-5 font-semibold">Run Your<span className="text-cyan-600"> Retail Business Brilliantly,</span> Welcome to your <span className="text-cyan-600">Butik</span></h1>
        <p className="text-gray-700">All-in-One Retail Management: Manage Everything, Sell Smarter.Take control of your retail business with a single, powerful app. </p>
        <div className="mt-7">
        <PrimaryLink fullyRounded href="/signin">
            GET STARTED NOW
        </PrimaryLink>
        </div>
      </div>
    </main>
  )
}
