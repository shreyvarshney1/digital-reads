import BookList from '@/components/shared/book/book-list'
import sampleData from '@/lib/sample-data'

export default function Home() {
  return (
    <div className=" space-y-8">
      <h2 className=" h2-bold">Latest E-Books</h2>
      <BookList data={sampleData.books} />
    </div>
  )
}
