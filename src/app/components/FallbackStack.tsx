import ServiceRow from "./ServiceRow";
import StackedCard from "./StackedCard";
import type { ServiceItem } from "./serviceData";

export default function FallbackStack({ services }: { services: ServiceItem[] }) {
  return (
    <div className="relative">
      {services.map((service, i) => (
        <StackedCard key={service.title} index={i + 1} isLast={i === services.length - 1}>
          <ServiceRow
            index={i + 1}
            title={service.title}
            exploreLabel={service.exploreLabel}
            description={service.description}
            tags={service.tags}
            graphic={<service.Graphic />}
            reverse={i % 2 === 1}
            stagger={(i % 3) * 0.06}
          />
        </StackedCard>
      ))}
    </div>
  );
}
