import BookList from '@/components/shared/book/book-list'
import sampleData from '@/lib/sample-data'

export default function Home() {
  return (
    <div className=" space-y-8">
      <h2 className=" h2-bold">Best Books of All Time</h2>
      <BookList data={sampleData.books} />
    </div>
  )
}
