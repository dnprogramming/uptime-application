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

    public virtual DbSet<Criticality> Criticalities { get; set; }

    public virtual DbSet<Host> Hosts { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__appstatu__3213E83FA82DF708");

            entity.ToTable("appstatus");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Appname).HasColumnName("appname");
            entity.Property(e => e.CriticalityId).HasColumnName("criticalityId");
            entity.Property(e => e.Currentappstatus).HasColumnName("currentappstatus");
            entity.Property(e => e.Lastupdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("lastupdated");
            entity.Property(e => e.Responsibility).HasColumnName("responsibility");

            entity.HasOne(d => d.Criticality).WithMany(p => p.Appstatuses)
                .HasForeignKey(d => d.CriticalityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__appstatus__criti__3A81B327");
        });

        modelBuilder.Entity<Criticality>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__critical__3213E83F12EA88A7");

            entity.ToTable("criticality");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CriticalityLevel)
                .HasMaxLength(50)
                .HasColumnName("criticalityLevel");
        });

        modelBuilder.Entity<Host>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__hosts__3213E83F6BA7B024");

            entity.ToTable("hosts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AppId).HasColumnName("appId");
            entity.Property(e => e.Hostname).HasColumnName("hostname");

            entity.HasOne(d => d.App).WithMany(p => p.Hosts)
                .HasForeignKey(d => d.AppId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__hosts__appId__3E52440B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
