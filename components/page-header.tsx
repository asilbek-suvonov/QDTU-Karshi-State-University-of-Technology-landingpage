interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">{title}</h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
