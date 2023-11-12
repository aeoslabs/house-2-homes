import PricingCard from "../ui/pricing";

const pricingData = [
  {
    name: "Basic",
    amount: 0,
    features: [
      "Unlimited Forms",
      "Unlimited Submissions",
      "Unlimited Storage",
      "Unlimited Users",
    ],
  },
  {
    name: "Basic",
    amount: 0,
    features: [
      "Unlimited Forms",
      "Unlimited Submissions",
      "Unlimited Storage",
      "Unlimited Users",
    ],
  },
  {
    name: "Basic",
    amount: 0,
    features: [
      "Unlimited Forms",
      "Unlimited Submissions",
      "Unlimited Storage",
      "Unlimited Users",
    ],
  },
  {
    name: "Basic",
    amount: 0,
    features: [
      "Unlimited Forms",
      "Unlimited Submissions",
      "Unlimited Storage",
      "Unlimited Users",
    ],
  },
];
const PricingComponent = () => {
  return (
    <section className="section p-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl">
          Pricing
        </h1>
        <p className="text-slate-500 text-lg">
          You can pick a plan of your choice here.
        </p>
      </div>

      <div className="grid grid-cols-4">
        {pricingData.map((pricing, index: number) => {
          //   const current = currentPlan();
          //   const isCurrentPlan = pricing.stripe_product_id === current.plan;
          //   const isDowngrade = pricing.amount < current.planAmount;

          return (
            <PricingCard
              name={pricing.name}
              price={pricing.amount}
              features={pricing.features || []}
              //link={pricing?.link || ""}
              key={index}
              // plan={plan || ""}
              // referenceId={user?.id || ""}
              // type={pricing.type}
              // isCurrentPlan={isCurrentPlan}
              // isDowngrade={isDowngrade}
              // region={pricing.region as "global" | "india"}
              // productId={pricing.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PricingComponent;
