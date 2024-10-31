import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
const BookCard = ({ book }: { book: any }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/book/${book.slug}`}>
          <Image
            alt={book.name}
            className="aspect-square object-cover rounded"
            height={300}
            src={book.images![0]}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="grid gap-1.5 text-sm leading-4">
          <p className="text-xs leading-3">{book.brand}</p>
        </div>
        <div className="grid gap-1.5 text-sm leading-4">
          <Link href={`/book/${book.slug}`}>
            <h2 className="text-sm font-medium">{book.name}</h2>
          </Link>
        </div>
        <div className="flex-between gap-4">
          <p>{book.rating} stars</p>
          {book.stock > 0 ? (
            <p className="font-bold">${book.price}</p>
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default BookCard
