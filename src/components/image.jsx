import { constructSRCSet } from "scripts/tmdb"

/**
 * @param {object} props
 * @param {string} props.path 
 * @param {string} props.entry 
 * @param {string} props.alt 
 * @param {string} props.className
 * @returns 
 */
export function TMDBImage({
  path, 
  entry, 
  className= "",
  alt = path,
}) {
  const links = constructSRCSet(path, entry);

  return (
    <figure className={className}>
      <a className="image-link" href={links[0]}>
        <picture >
          <img 
            src={links[0]}
            srcSet={links[1]}
            alt={alt}
          />
        </picture>
      </a>
    </figure>
  )
}