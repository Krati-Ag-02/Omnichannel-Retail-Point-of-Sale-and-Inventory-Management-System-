import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

function Products() {
  return (
    <div className="space-y-6">
      <div className="
        flex items-center justify-between
      ">
        <div>
          <h1 className="
            text-3xl
            font-semibold
          ">
            Products
          </h1>

          <p className="
            text-slate-400
            mt-2
          ">
            Manage inventory and stock
          </p>
        </div>

        <Button>
          Add Product
        </Button>
      </div>

      <div className="
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        overflow-hidden
      ">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="border-white/10">
              <TableCell>Loading...</TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Products