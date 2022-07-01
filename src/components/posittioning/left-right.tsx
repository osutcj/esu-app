interface LeftRightProps {
  className?: string;
  left?: JSX.Element;
  right?: JSX.Element;
}

const LeftRight = ({ className, left, right }: LeftRightProps) => {
  return (
    <div className={`lg:flex lg:items-center lg:justify-between ${className}`}>
      <div className="flex-1 min-w-0">
        {left}
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {right}
      </div>
    </div>
  );
};

LeftRight.defaultProps = {
  className: '',
  left: <></>,
  right: <></>,
}

export default LeftRight;
