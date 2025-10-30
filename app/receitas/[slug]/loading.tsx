export default function Loading() {
	return (
		<div className="py-8">
			<h2 className="text-xl font-semibold mb-2">Carregando receita…</h2>
			<div className="animate-pulse space-y-2">
				<div className="h-6 bg-gray-200 rounded w-3/4" />
				<div className="h-4 bg-gray-200 rounded w-1/2" />
				<div className="h-40 bg-gray-100 rounded" />
			</div>
		</div>
	);
}
