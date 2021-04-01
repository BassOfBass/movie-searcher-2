import { constructSRCSet } from "scripts/tmdb"

/**
 * @param {object} props
 * @param {string} props.path 
 * @param {string} props.entry 
 * @param {string} props.alt 
 * @returns 
 */
export function TMDBImage({path, entry, alt = path}) {
  const links = constructSRCSet(path, entry);

  return (
    <figure>
      <a href={links[0]}>
        <picture>
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