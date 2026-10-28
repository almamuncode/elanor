import { CURRENCY } from "@/lib/products";
import { formatAmount, formatPrice } from "@/lib/format";

export default function Price({ amount, className = "price", style }: { amount: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style}>
      <span className="sr-only">{formatPrice(amount)}</span>
      <span aria-hidden="true">
        <small>{CURRENCY.code}</small>
        {formatAmount(amount)}
      </span>
    </span>
  );
}
