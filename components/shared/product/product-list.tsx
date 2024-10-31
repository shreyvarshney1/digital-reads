import BookCard from './book-card'

const BookList = ({ data }: { data: any }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((book: any) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      ) : (
        <div>
          <p>No book found</p>
        </div>
      )}
    </>
  )
}

export default BookList
