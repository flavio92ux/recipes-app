import { homeMetadata } from '../lib/seo';

describe('SEO Metadata', () => {
  describe('homeMetadata', () => {
    it('should have correct base metadata', () => {
      expect(homeMetadata.title).toBe('Delícias na Cozinha | Receitas Fáceis e Rápidas');
      expect(homeMetadata.description).toBe(
        'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas, massas, pratos fit e muito mais para todas as ocasiões. Aprenda a cozinhar com receitas simples e saborosas.'
      );
    });

    it('should have all required OpenGraph properties', () => {
      const og = homeMetadata.openGraph;
      expect(og).toBeDefined();
      expect(og?.title).toBe('Delícias na Cozinha | Receitas Fáceis e Rápidas');
      expect(og?.description).toBeDefined();
      expect(og?.url).toBe('https://deliciasnacozinha.com');
      expect(og?.siteName).toBe('Delícias na Cozinha');
      expect(og?.locale).toBe('pt_BR');
    });

    it('should have valid OpenGraph image configuration', () => {
      const images = homeMetadata.openGraph?.images;
      expect(images).toBeDefined();
    });

    it('should have correct robots configuration', () => {
      const robots = homeMetadata.robots;
      expect(robots).toEqual({
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      });
    });

    it('should have valid canonical URL', () => {
      const alternates = homeMetadata.alternates;
      expect(alternates?.canonical).toBe('http://localhost:3000/');
    });

    it('should have valid keywords', () => {
      const keywords = homeMetadata.keywords;
      expect(Array.isArray(keywords)).toBe(true);
      expect(keywords).toContain('receitas');
      expect(keywords).toContain('cozinha');
      expect(keywords).toContain('gastronomia');
    });
  });
});