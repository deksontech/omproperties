export function IconButton({ ariaLabel, children, className = '', onClick }) {
  return (
    <button className={`icon-button ${className}`.trim()} type="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
