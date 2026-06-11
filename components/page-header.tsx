interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-2xl font-medium uppercase tracking-tighter mb-1">{title}</h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
