export default function DetailsUpload() {
  return (
    <div className="flex flex-col" style={{ margin: "10px" }}>
      <div className="flex flex-row justify-between items-start">
        <input
          placeholder="Enter Name of Doctor"
          className="p-3  rounded-sm border border-gray-400 w-[50%]"
          style={{ marginBottom: "10px", padding: "10px", marginRight: "5px" }}
        />
        <select
          placeholder="Enter type of file"
          style={{ padding: "12px" }}
          className=" w-[50%] rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
        >
          <option value="" disabled selected hidden>
            Enter type of file
          </option>
          <option value="summaries">Summaries</option>
          <option value="exam">Exam</option>
          <option value="book">Book</option>
          <option value="slides">Slides</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      <textarea
        placeholder="Enter description..."
        className="h-20 rounded-sm border border-gray-400 resize-none w-full"
        style={{ padding: "10px" }}
      />
    </div>
  );
}
