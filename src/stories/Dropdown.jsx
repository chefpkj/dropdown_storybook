import React, { useState, useEffect } from 'react';
import { Info, UserCircle } from 'phosphor-react';

const Dropdown = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
  onItemSelected
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(activeItemIndex);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    setSelectedIndex(activeItemIndex);
  }, [activeItemIndex]);

  const toggleDropdown = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (index) => {
    if (type === 'Multi') {
      const newSelectedIndices = selectedIndices.includes(index)
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];
      setSelectedIndices(newSelectedIndices);
      onItemSelected(newSelectedIndices);
    } else {
      setSelectedIndex(index);
      setIsOpen(false);
      onItemSelected(index);
    }
  };

  const renderIcon = (iconVisibility, IconComponent, color, weight, size) => {
    return iconVisibility === 'Visible' ? <IconComponent size={24} color={color} className="" /> : null;
  };

  return (
    <div className="relative w-64">
      {/* Label */}
      {labelVisibility === 'Visible' && (
        <label className="block mb-2 gap-1 text-gray-700 font-semibold flex items-center">
          <div>{label}</div>
          <div>{renderIcon(labelIconVisibility, Info)}</div>
          <div>{required === 'Yes' && <span className="text-red-500">*</span>}</div>
        </label>
      )}

      {/* Select */}
      <div
        className={`relative border-2 rounded-lg p-2 flex items-center ${
          status === 'Unfilled'
            ? 'border-gray-300 cursor-pointer'
            : status === 'Filled'
            ? 'border-green-500 cursor-pointer'
            : status === 'Disabled'
            ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
            : 'border-red-500 cursor-pointer'
        }`}
        onClick={toggleDropdown}
      >
        {renderIcon(leftIconVisibility, UserCircle, "#747475")}
        <div className="flex-grow text-gray-500 ml-2 overflow-hidden">
  {(() => {
    const textToDisplay =
      type === 'Multi'
        ? selectedIndices.length > 0
          ? selectedIndices.map((index) => items[index]).join(', ')
          : text
        : selectedIndex >= 0
        ? items[selectedIndex]
        : text;

    return textToDisplay.length > 22
      ? textToDisplay.substring(0, 22) + '...'
      : textToDisplay;
  })()}
</div>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div>
          <svg className='absolute z-20 top-[4.1rem] left-[7rem]' xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="#47b647" viewBox="0 0 256 256">
            <path d="M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z"></path>
          </svg>
          <ul style={{ scrollbarWidth: "none" }} className="absolute top-[5rem] left-0 w-full bg-white border border-gray-300 mt-1 shadow-lg z-10 max-h-48 overflow-y-auto">
            {items.map((item, index) => (
              <li
                key={index}
                className={`p-3 cursor-pointer hover:bg-gray-100 ${
                  (type === 'Multi' && selectedIndices.includes(index)) || (type !== 'Multi' && index === selectedIndex) ? 'bg-green-100' : ''
                }`}
                onClick={() => handleSelect(index)}
              >
                <div className='flex items-center'>
                  {type === 'SingleRadio' && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="single-select"
                        className="form-radio h-4 w-4 hidden"
                        checked={index === selectedIndex}
                        onChange={() => handleSelect(index)}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${index === selectedIndex ? 'border-green-500 bg-green-500' : 'border-gray-300'
                          }`}
                      >
                        {index === selectedIndex && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                    </div>
                  )}
                  {type === 'Multi' && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 hidden"
                        checked={selectedIndices.includes(index)}
                        onChange={() => handleSelect(index)}
                      />
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedIndices.includes(index) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                          }`}
                      >
                        {selectedIndices.includes(index) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                  <div className='text-sm ml-2'>{item}</div>
                  {(type === 'SingleNoIcon' && index === selectedIndex) ? (
                    <span className='ml-auto'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#47b647" viewBox="0 0 256 256">
                        <path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path>
                      </svg>
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Helper Text */}
      {helperText && <div className="mt-2 text-gray-500 text-xs px-1">{helperText}</div>}
    </div>
  );
};

export default Dropdown;
