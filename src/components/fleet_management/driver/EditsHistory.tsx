const EditsHistory = () => {
  const editHistory = [
    { editor: "Adom Merch", date: "02/10/2022", comment: "Address Change" },
    { editor: "Adom Merch", date: "02/10/2022", comment: "Number Change" },
    {
      editor: "Adom Merch",
      date: "02/10/2022",
      comment: "Email Address Change",
    },
    { editor: "Adom Merch", date: "02/10/2022", comment: "Number Change" },
    {
      editor: "Adom Merch",
      date: "02/10/2022",
      comment: "Email Address Change",
    },
  ];

  return (
    <div className="bg-gray-200/50 p-4 mt-4 rounded-lg border border-[#e0e6e9] text-sm">
      <h3 className="text-base font-semibold mb-1">Edits History</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-xs border-b border-gray-300">
              <th className="p-2">EDITED BY </th>
              <th className="p-2">EDIT DATE </th>
              <th className="p-2">COMMENTS </th>
            </tr>
          </thead>
          <tbody>
            {editHistory.map((edit, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-xs text-gray-500"
              >
                <td className="p-2">{edit.editor}</td>
                <td className="p-2">{edit.date}</td>
                <td className="p-2">{edit.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditsHistory;
