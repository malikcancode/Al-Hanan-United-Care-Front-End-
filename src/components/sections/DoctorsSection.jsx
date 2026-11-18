import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Icon from "@/components/ui/Icon";
import { assetUrl } from "@/services/apiClient";

export default function DoctorsSection({ doctors, showHeading = true, limit }) {
  const list = limit ? doctors.slice(0, limit) : doctors;
  const more = limit && doctors.length > limit;

  return (
    <section id="doctors" className="section bg-white">
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">Meet our doctors</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Qualified doctors and specialists who look after you and your family.
              </p>
            </div>
            {more && (
              <Link href="/doctors" className="link-arrow shrink-0">
                All doctors <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            )}
          </div>
        )}

        {list.length === 0 ? (
          <p
            className={`rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center text-muted ${
              showHeading ? "mt-10" : ""
            }`}
          >
            Our doctors will be introduced here soon.
          </p>
        ) : (
          <ul
            className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 ${
              showHeading ? "mt-10 lg:mt-12" : ""
            }`}
          >
            {list.map((doctor) => (
              <li key={doctor._id}>
                <Avatar src={assetUrl(doctor.photoUrl)} alt={doctor.name} />
                <h3 className="mt-4 font-sans text-base font-semibold tracking-normal sm:text-lg">{doctor.name}</h3>
                {doctor.specialty && <p className="mt-0.5 text-[0.9375rem] font-medium text-brand-700">{doctor.specialty}</p>}
                {doctor.qualifications && <p className="mt-1 text-sm text-muted">{doctor.qualifications}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
