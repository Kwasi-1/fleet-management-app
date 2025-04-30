import { styles } from "@/lib/styles";

const DataItem: React.FC<{
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ label, value, highlight = false }) => (
  <div className="flex justify-between text-[13px]">
    <span className="text-gray-400">{label}:</span>
    <span className={highlight ? "text-red-500 font-bold" : "font-semibold"}>
      {value}
    </span>
  </div>
);

const matchData = [
  {
    street: "7, Idehen Street, Oredo",
    city: "Benin City",
    state: "Edo",
    zip: "3210",
    name: "Chioma Ngozi",
    id: "00156234",
    idCategory: "ECOWAS Card",
    provider: "Jumia",
  },
  {
    street: "18, Bello Ajare Street",
    city: "Agege",
    state: "Adepoem",
    zip: "4152",
    name: "Chioma Ngozi",
    id: "00156234",
    idCategory: "ECOWAS Card",
    provider: "Alina",
  },
  {
    street: "18, Bello Ajare Street",
    city: "Agege",
    state: "Adepoem",
    zip: "4152",
    name: "Chioma Ngozi",
    id: "00156234",
    idCategory: "ID",
    provider: "Alina",
  },
];

const ThirdPartyMatches = () => {
  return (
    <div
      className={` ${styles.cardSmall} p-4 rounded-xl border border-[#e0e6e990] text-gray-700`}
    >
      <div className="flex justify-between items-center border-b border-[#e0e6e9] pb-2">
        <h3 className="text-[17px] font-semibold">
          3rd Party Entity Resolution Match
        </h3>
        <div className="text-xs text-gray-400">4 RESULTS</div>
      </div>

      {/* Scrollable Container for Cards */}
      <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {matchData.map((match, index) => (
          <div
            key={index}
            className="p-4 rounded-lg min-w-[320px] border border-gray-200"
          >
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-2">
              <div>
                <h3 className="text-sm font-semibold">
                  Potentially Sanctioned Entity for Chioma Ngozi
                </h3>
                <p className="text-xs text-gray-400">
                  AML - 3rd Party Entity Resolution
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-3">
              <DataItem label="Matched Street" value={match.street} />
              <DataItem label="Matched City" value={match.city} />
              <DataItem label="Matched State" value={match.state} />
              <DataItem label="Matched Zip Code" value={match.zip} />
              <DataItem label="Matched Name" value={match.name} />
              <DataItem
                label="Matched Unique Identifier"
                value={match.id}
                highlight
              />
              <DataItem
                label="Matched Unique Identifier Category"
                value={match.idCategory}
              />
              <DataItem label="ER Provider" value={match.provider} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdPartyMatches;
