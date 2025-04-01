import React, { FC, InputHTMLAttributes, ReactNode, useId } from 'react';
import classNames from 'classnames';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  value: string;
  wrapperClassName?: string;
};

const Checkbox: FC<CheckboxProps> = ({ label, value, wrapperClassName = '', checked, className, ...props }) => {
  const id = useId();

  return (
    <div className={classNames('flex group items-start gap-x-3', wrapperClassName)}>
      <div>
        <label
          className={classNames(
            'w-5 h-5 cursor-pointer border border-gray-300 block relative bg-white group-hover:bg-gray-200',
            className
          )}
          htmlFor={id}
        >
          {checked && (
            <svg
              className="absolute -top-1.5 left-px"
              width="24"
              height="24"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 7.5L6 11.5L15 1" stroke="currentColor" strokeWidth="3" />
            </svg>
          )}
        </label>
        <input
          className={classNames('h-0 w-0 invisible z-10 block')}
          type="checkbox"
          value={value}
          checked={checked}
          id={id}
          {...props}
        />
      </div>

      <label className={classNames('cursor-pointer leading-5', { 'opacity-50': props.disabled })} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
