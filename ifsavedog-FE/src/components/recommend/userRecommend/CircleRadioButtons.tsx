import { ChangeEvent, useState } from 'react';

const CircleRadioButtons = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex gap-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="circleRadio"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={handleChange}
          className="hidden"
        />
        <span
          className={`w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center ${
            selectedValue === 'option1' ? 'bg-green-500' : ''
          }`}
        >
          {selectedValue === 'option1' && (
            <span className="w-3 h-3 bg-white rounded-full"></span>
          )}
        </span>
        <span className="ml-2">매우 그렇다</span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="circleRadio"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={handleChange}
          className="hidden"
        />
        <span
          className={`w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center ${
            selectedValue === 'option2' ? 'bg-green-500' : ''
          }`}
        >
          {selectedValue === 'option2' && (
            <span className="w-3 h-3 bg-white rounded-full"></span>
          )}
        </span>
        <span className="ml-2">다소 그렇다</span>
      </label>

      {/* Add more radio buttons as needed */}
    </div>
  );
};

export default CircleRadioButtons;
