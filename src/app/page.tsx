import DataEntryForm from "@/components/DataEntryForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl mb-20">
          Data Entry Application
        </h1>
        <div>
          <DataEntryForm />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
