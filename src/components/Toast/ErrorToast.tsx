import * as Toast from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';

type ErrorToastProps = {
  isOpen: boolean
}

const ErrorToast = ({ isOpen }: ErrorToastProps) => {
  
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Toast.Provider label='Alert'>
      <Toast.Root open={open} onOpenChange={(open) => setOpen(open)} className='motion-safe:data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] motion-safe:data-[swipe=cancel]:translate-x-0 motion-safe:data-[swipe=cancel]:transition-transform motion-safe:data-[state=open]:animate-slideIn motion-safe:data-[state=closed]:animate-swipeOut'>
        <Toast.Description asChild className="flex items-center gap-4 p-4 mb-4 w-full max-w-xs text-red-900 bg-red-200 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
          <div id="toast-danger" role="alert">
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-900 bg-red-400 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="text-sm font-normal">Something went wrong.</div>

            <Toast.Close aria-label='Close' className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Toast.Close>
          </div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="absolute z-50 bottom-5 right-[var(--toast-right-padding)] ml-3 -mr-[var(--toast-right-padding)] pr-[var(--toast-right-padding)] overflow-hidden" label='Alert'/>
    </Toast.Provider>
  )
}

export default ErrorToast