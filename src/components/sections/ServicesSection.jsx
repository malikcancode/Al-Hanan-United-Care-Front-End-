import Link from "next/link";
import ServiceIcon from "@/components/ui/ServiceIcon";
import Icon from "@/components/ui/Icon";

function ServiceList({ services, columns }) {
  return (
    <ul className={`grid border-t border-line ${columns === 2 ? "md:grid-cols-2 md:gap-x-12" : ""}`}>
      {services.map((service) => (
        <li key={service._id} className="flex gap-5 border-b border-line py-6 sm:py-7">
          <ServiceIcon name={service.icon} />
          <div className="min-w-0">
            <h3 className="font-sans text-lg font-semibold tracking-normal">{service.title}</h3>
            {service.description && (
              <p className="mt-1.5 max-w-prose leading-relaxed text-muted">{service.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Empty() {
  return (
    <p className="rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center text-muted">
      Our services will be listed here soon.
    </p>
  );
}

export default function ServicesSection({ services, showHeading = true }) {
  if (!showHeading) {
    return (
      <section id="services" className="section bg-white">
        <div className="container-page">
          {services.length ? <ServiceList services={services} columns={2} /> : <Empty />}
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-3xl font-semibold sm:text-4xl">Care you can reach from anywhere</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Everything you need for everyday care, delivered through your phone or computer.
          </p>
          <Link href="/services" className="link-arrow mt-6">
            All services <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        {services.length ? <ServiceList services={services} /> : <Empty />}
      </div>
    </section>
  );
}
