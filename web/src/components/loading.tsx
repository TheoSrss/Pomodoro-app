export const Loading = () => {
    return (
        <section className="flex items-center justify-center w-full h-full">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="h-5 w-5 rounded-full mr-2 last:mr-0 animate-pulse-dot"
                    style={{ animationDelay: `${-0.3 + index * 0.2}s` }}
                />
            ))}
        </section>
    );
};
