const ImageLoader = ({ src, alt, fallback = '/img/default.png', ...props }) => {
    return (
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.target.src = fallback;
          e.target.alt = 'Imagen no disponible';
        }}
        {...props}
      />
    );
  };