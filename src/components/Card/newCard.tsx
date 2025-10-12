
const Card = () => {
  return (
    <div className="card shadow-[0px_4px_16px_px_#367E08] h-[400px] w-[280px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full bg-[#111111]" />
      <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
        <div className="h-fit w-full">
          <h1 className="card_heading text-[1.5em] tracking-[.2em]" style={{fontWeight: 900, WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: 1, textShadow: '0 0 7px #fff'}}>
            STEEL BALL RUN
          </h1>
          <p className="text-[1.2em]" style={{fontWeight: 900, WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: 1, textShadow: '0 0 7px #fff'}}>
            By Hirohiko Araki
          </p>
        </div>
        <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
          <div className="w-fit h-fit flex justify-left gap-[0.5em]">
          </div>
        </div>
      </div>
      <p className="font-nunito block text-white font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet officiis,
        dolorem ab animi magnam culpa fugit error voluptates adipisci, debitis ut
        fuga at nisi laborum suscipit a eos similique unde.
      </p>
    </div>
  );
}

export default Card;
