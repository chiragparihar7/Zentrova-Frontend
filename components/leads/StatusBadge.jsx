const styles = {
    pending: "bg-gray-200 text-gray-700",
    contacted: "bg-blue-100 text-blue-600",
    quotation: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-600",
    lost: "bg-red-100 text-red-600",
  };
  
  export default function StatusBadge({ status }) {
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
        {status}
      </span>
    );
  }