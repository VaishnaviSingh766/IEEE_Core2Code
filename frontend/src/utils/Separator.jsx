const Separator = ({ className = "" }) => {
	return (
		<div
			aria-hidden="true"
			className={`mx-auto mb-3 flex items-center justify-center gap-3 ${className}`}
		>
			<span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
			<span className="h-2.5 w-2.5 rotate-45 bg-[#D4AF37]" />
			<span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
		</div>
	);
};

export default Separator;
