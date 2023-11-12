import { CSSProperties } from 'react';
import { PulseLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto'
};

function CenteredSpinner({ color, text }: { color?: string; text?: string }) {
  return (
    <div className="flex flex-col justify-center align-middle w-full">
      <PulseLoader
        color={color || `white`}
        loading={true}
        cssOverride={override}
        size={14}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="mx-auto"
      />
      {text && (
        <div className="w-full text-white flex justify-center mt-4">
          <p className="text-md">{text}</p>
        </div>
      )}
    </div>
  );
}

export default CenteredSpinner;