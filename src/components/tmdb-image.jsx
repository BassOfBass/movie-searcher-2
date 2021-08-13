import { constructSRCSet } from "scripts/tmdb";

/**
 * @param {object} props
 * @param {string} props.path 
 * @param {string} props.entry 
 * @param {string} props.className
 * @param {string} props.alt 
 */
export function TMDBImage({path, entry, className = "", alt = path}) {
  const [src, srcset] = constructSRCSet(path, entry);

  return (
    <figure className={className}>
      <a href={src} className="image-link">
        <picture>
          <img 
            src={src} 
            srcSet={srcset} 
            alt={alt}
          />
        </picture>
      </a>
    </figure>
  );
}