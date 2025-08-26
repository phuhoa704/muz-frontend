import RcSelect from 'react-select';
import RcAsyncSelect from 'react-select/async';
import { cn } from '../../../lib/utils';
import React from 'react';

interface SelectProps extends React.ComponentPropsWithoutRef<typeof RcSelect> {
    disabled?: boolean;
    className?: string;
    styles?: any;
    isDisabled?: boolean;
    menuPortalTarget?: HTMLElement
}

interface AsyncSelectProps extends React.ComponentPropsWithoutRef<typeof RcAsyncSelect> {
    disabled?: boolean;
    className?: string;
    styles?: any;
    isDisabled?: boolean;
}

const classNames = {
    container: () => 'relative',
    control: () => 'flex w-full items-center justify-between rounded-md text-sm',
    menu: () => 'z-50 max-h-96 min-w-[8rem] rounded-md border bg-white text-dark shadow-md',
    menuList: () => 'space-y-1',
    option: (state: any) => cn('w-full rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none', state.isSelected && 'font-semibold')
}

const Select = React.forwardRef<React.ElementRef<typeof RcSelect>, SelectProps>(({ className, styles, disabled, isDisabled, menuPortalTarget = document.body, ...props }, ref) => (
    <RcSelect
        {...props}
        ref={ref}
        isDisabled={disabled || isDisabled}
        className={cn('react-select-container w-full', className)}
        classNamePrefix="react-select"
        styles={{ ...styles }}
        classNames={classNames}
        // menuPortalTarget={menuPortalTarget}
    />
))
Select.displayName = 'Select';

const AsyncSelect = React.forwardRef<React.ElementRef<typeof RcAsyncSelect>, AsyncSelectProps>(({className, styles, disabled, isDisabled, ...props}, ref) => (
    <RcAsyncSelect
      isDisabled={disabled || isDisabled}
      cacheOptions={true}
      className={cn('react-select-container w-full', className)}
      classNamePrefix="react-select"
      styles={{ ...styles }}
      classNames={classNames}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      ref={ref}
      {...props}
    />
))
AsyncSelect.displayName = 'AsyncSelect';

export { AsyncSelect, Select }
export type { AsyncSelectProps, SelectProps }