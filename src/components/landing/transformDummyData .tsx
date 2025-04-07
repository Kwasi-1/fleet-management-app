export const transformDummyData = (data: any) => {
  const { wholesalers, microfinance, market_businesses } =
    data["foundry-ecosytem"];

  // Flatten and map data with 'type' property
  const flattenBusinesses = (businesses: any[], type: string) =>
    businesses.map((b) => ({
      name: b.name,
      type,
      location: b.location,
    }));

  return [
    ...flattenBusinesses(wholesalers, "wholesaler"),
    ...flattenBusinesses(microfinance, "microfinance"),
    ...flattenBusinesses(market_businesses, "market_business"),
  ];
};
