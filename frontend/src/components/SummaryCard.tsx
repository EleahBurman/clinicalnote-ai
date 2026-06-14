// In TypeScript, we define Props as an interface
// This tells React exactly what data this component expects to receive
interface SummaryCardProps {
  label: string;
  value: string | string[] | null;
}

export default function SummaryCard({ label, value }: SummaryCardProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
        {label}
      </p>
      {/* If value is an array, render a list. Otherwise render a string. */}
      {Array.isArray(value) ? (
        <ul className="space-y-1">
          {value.map((item, index) => (
            <li key={index} className="text-sm text-gray-800 flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">▸</span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm font-medium text-gray-800">{value}</p>
      )}
    </div>
  );
}