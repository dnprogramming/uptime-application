namespace backend.DataContext;

public partial class UptimereportsContext : DbContext
{
    public UptimereportsContext()
    {
    }

    public UptimereportsContext(DbContextOptions<UptimereportsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Appstatus> Appstatuses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__appstatu__3213E83F9E4899CB");

            entity.ToTable("appstatus");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Appname).HasColumnName("appname");
            entity.Property(e => e.Currentappstatus).HasColumnName("currentappstatus");
            entity.Property(e => e.Lastupdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("lastupdated");
            entity.Property(e => e.Responsibility).HasColumnName("responsibility");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
