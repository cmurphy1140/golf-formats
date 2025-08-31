'use client';
import { useFormats } from '@/src/hooks/use-formats';
import { useSearch } from '@/src/hooks/use-search';
import FormatGrid from '@/components/formats/format-grid';
import FormatFilters from '@/components/formats/format-filters';
import SearchBar from '@/components/search-bar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function FormatsPage() {
  const { formats, totalFormats, filteredCount } = useFormats();
  const { query } = useSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container-centered py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Golf Format Explorer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the perfect golf format for your next round. Browse {totalFormats} different 
            ways to play golf, from classic tournament formats to fun betting games.
          </p>
        </div>

        {/* Search Bar - Mobile/Desktop */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto lg:hidden">
            <SearchBar 
              placeholder="Search formats, rules, or categories..."
              className="w-full"
            />
          </div>
          
          <div className="hidden lg:block max-w-4xl mx-auto">
            <SearchBar 
              placeholder="Search formats, rules, or categories..."
              className="w-full"
              showSuggestions={true}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {query ? 'Results' : 'Total Formats'}
            </div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              5
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Categories
            </div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              1-144
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Players
            </div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              All
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Skill Levels
            </div>
          </Card>
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/formats?category=tournament">Tournament</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/formats?category=casual">Casual</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/formats?category=betting">Betting</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/formats?category=team">Team</Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Desktop */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FormatFilters />
            </div>
          </div>

          {/* Format Grid */}
          <div className="flex-1 min-w-0">
            <FormatGrid 
              formats={formats}
              totalCount={totalFormats}
            />
          </div>
        </div>

        {/* No Results State */}
        {formats.length === 0 && (
          <Card className="text-center py-16 mt-8">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No formats found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {query 
                  ? `No formats match "${query}". Try adjusting your search or filters.`
                  : 'Try adjusting your filters to see more formats.'
                }
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/formats">Reset All</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/formats?category=casual">Browse Casual</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/formats?skillLevel=beginner">Beginner Friendly</Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* CTA Section */}
        {formats.length > 0 && (
          <Card className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0" variant="gradient">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Can&apos;t find the perfect format?
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Explore our comparison tool to find formats that match your exact needs, 
                or browse by specific categories and skill levels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" asChild>
                  <a href="/compare">Compare Formats</a>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="/search">Advanced Search</a>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}