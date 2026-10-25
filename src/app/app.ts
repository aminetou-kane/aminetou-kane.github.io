import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Language = 'fr' | 'en';

const PAGE_TITLES: Record<Language, string> = {
  fr: 'Aminetou Kane — Étudiante en Informatique · Data & IA',
  en: 'Aminetou Kane — Computer Science Student · Data & AI',
};

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  // =========================================================
  // CV
  // Pour activer le bouton « Télécharger mon CV » :
  //   1. déposer le fichier PDF dans  public/cv/CV_Aminetou_Kane.pdf
  //   2. passer cvAvailable à true
  // =========================================================

  protected readonly cvUrl = 'cv/CV_Aminetou_Kane.pdf';
  protected readonly cvAvailable = false;


  // =========================================================
  // LANGUE
  // =========================================================

  protected readonly language = signal<Language>('fr');

  protected setLanguage(lang: Language): void {
    this.language.set(lang);
    this.document.documentElement.lang = lang;
    this.document.title = PAGE_TITLES[lang];

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // stockage indisponible (navigation privée, etc.) : on ignore
    }
  }

  protected isFrench(): boolean {
    return this.language() === 'fr';
  }

  protected isEnglish(): boolean {
    return this.language() === 'en';
  }


  // =========================================================
  // MENU MOBILE
  // =========================================================

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }


  // =========================================================
  // CARROUSEL D'IMAGES — MÉMORIA
  // =========================================================

  protected readonly memoriaImageIndex = signal(0);

  ngOnInit(): void {
    // Restaure la langue choisie lors d'une visite précédente
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') {
        this.setLanguage(saved);
      }
    } catch {
      // ignoré
    }

    const timer = setInterval(() => {
      this.memoriaImageIndex.update(index => (index + 1) % 5);
    }, 3000);

    // Arrête le minuteur quand le composant est détruit
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

}
