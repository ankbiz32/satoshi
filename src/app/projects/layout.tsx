import FavoriteProjectsSidebar from '@/app/projects/components/FavouritesSidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <div style={{ display: 'flex' }}>
          <FavoriteProjectsSidebar />
          <div style={{ flex: 1 }}>{children}</div>
        </div>
  );
}
