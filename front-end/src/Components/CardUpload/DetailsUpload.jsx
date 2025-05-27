export default function DetailsUpload() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ margin: "10px" }}
    >
      <input
        placeholder="Enter Name of Doctor"
        className="p-3  rounded-sm border border-gray-400 w-full"
        style={{ marginBottom: "10px", padding: "10px" }}
      />
      <textarea
        placeholder="Enter description..."
        className="h-20 rounded-sm border border-gray-400 resize-none w-full"
        style={{ padding: "10px" }}
      />
    </div>
  );
}
