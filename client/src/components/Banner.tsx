const BannerStyle = {
    backgroundColor: "#500000",
    color: "white",
    width: "100vw",
    height: "min(25vh, 75px)",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2em'
};

interface BannerProps {
    title: string;
}

export default function Banner(props: BannerProps) {
    return (<>
        <div style={BannerStyle}>
            <h1>{props.title}</h1>
        </div>
    </>);
}