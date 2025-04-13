interface OpenGraphImageProps {
  imageUrl: string;
}

const OpenGraphImage = ({ imageUrl }: OpenGraphImageProps) => {
  return (
    <meta property="og:image" content={imageUrl} />
  );
};

export default OpenGraphImage;