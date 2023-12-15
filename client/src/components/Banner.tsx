const BannerStyle = {
  backgroundColor: "#500000",
  color: "white",
  width: "100vw",
  height: "min(25vh, 75px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2em",
};

const logoStyle = {
  maxWidth: "20vw",
  width: "calc(20% - 8vw)",
};

interface BannerProps {
  title: string;
}

export default function Banner(props: BannerProps) {
  return (
    <>
      <div style={BannerStyle}>
        <img
          style={logoStyle}
          src='../../public/media/secbasic.png'
          alt='SEC Logo'
        />
        <h1>{props.title}</h1>
      </div>
    </>
  );
}
