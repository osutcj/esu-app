interface RightProps {
  className?: string;
  right?: JSX.Element;
}

const Right = ({ className, right }: RightProps) => {
  return (
    <div className={`lg:flex lg:items-center lg:justify-between ${className}`}>
      <div className="grow" />
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {right}
      </div>
    </div>
  );
};

Right.defaultProps = {
  className: '',
  left: <></>,
  right: <></>,
}

export default Right;
