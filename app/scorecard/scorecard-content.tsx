'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { golfFormats } from '@/data/formats';
import { 
  ArrowLeft,
  ClipboardList,
  Users,
  Trophy,
  Plus,
  Minus,
  Save,
  RotateCcw,
  ChevronRight,
  Settings,
  Target,
  Flag
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  handicap: number;
}

interface HoleScore {
  hole: number;
  par: number;
  scores: { [playerId: string]: number };
}

function ScorecardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formatId = searchParams.get('format');
  
  const [selectedFormat, setSelectedFormat] = useState<string | null>(formatId);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', handicap: 0 },
    { id: '2', name: 'Player 2', handicap: 0 }
  ]);
  const [currentHole, setCurrentHole] = useState(1);
  const [holes, setHoles] = useState<HoleScore[]>([]);
  const [showFormatSelector, setShowFormatSelector] = useState(!formatId);

  const format = selectedFormat ? golfFormats.find(f => f.id === selectedFormat) : null;

  // Initialize holes
  useEffect(() => {
    const defaultHoles: HoleScore[] = [];
    const standardPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];
    
    for (let i = 1; i <= 18; i++) {
      const holeScores: { [playerId: string]: number } = {};
      players.forEach(player => {
        holeScores[player.id] = 0;
      });
      
      defaultHoles.push({
        hole: i,
        par: standardPars[i - 1],
        scores: holeScores
      });
    }
    
    setHoles(defaultHoles);
  }, [players]);

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
    setShowFormatSelector(false);
    router.push(`/scorecard?format=${formatId}`);
  };

  const addPlayer = () => {
    const newPlayer: Player = {
      id: `${Date.now()}`,
      name: `Player ${players.length + 1}`,
      handicap: 0
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerId: string) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== playerId));
    }
  };

  const updatePlayerName = (playerId: string, name: string) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, name } : p
    ));
  };

  const updatePlayerHandicap = (playerId: string, handicap: number) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, handicap } : p
    ));
  };

  const updateScore = (hole: number, playerId: string, score: number) => {
    setHoles(holes.map(h => 
      h.hole === hole 
        ? { ...h, scores: { ...h.scores, [playerId]: Math.max(0, score) } }
        : h
    ));
  };

  const getPlayerTotal = (playerId: string) => {
    return holes.reduce((total, hole) => total + (hole.scores[playerId] || 0), 0);
  };

  const getPlayerToPar = (playerId: string) => {
    const total = getPlayerTotal(playerId);
    const par = holes.reduce((sum, hole) => sum + hole.par, 0);
    const diff = total - par;
    if (total === 0) return '-';
    if (diff === 0) return 'E';
    return diff > 0 ? `+${diff}` : `${diff}`;
  };

  const resetScores = () => {
    if (confirm('Are you sure you want to reset all scores?')) {
      setHoles(holes.map(hole => ({
        ...hole,
        scores: Object.fromEntries(players.map(p => [p.id, 0]))
      })));
      setCurrentHole(1);
    }
  };

  if (showFormatSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-green-50/20 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-masters-slate hover:text-masters-pine transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-masters-pine/20 overflow-hidden">
            <div className="bg-gradient-to-r from-masters-pine to-masters-fairway p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList size={28} />
                <h1 className="text-3xl font-bold">Select a Format</h1>
              </div>
              <p className="text-masters-cream/90">Choose the format you'll be playing today</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {golfFormats.map(format => (
                  <button
                    key={format.id}
                    onClick={() => handleFormatSelect(format.id)}
                    className="text-left p-4 bg-white border-2 border-masters-pine/10 rounded-lg hover:border-masters-pine/30 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-masters-charcoal group-hover:text-masters-pine transition-colors">
                          {format.name}
                        </h3>
                        <p className="text-sm text-masters-slate mt-1 line-clamp-2">
                          {format.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-masters-slate/70">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {format.players.min}-{format.players.max}
                          </span>
                          <span>{format.category}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-masters-pine/50 group-hover:text-masters-pine group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-green-50/20">
      {/* Header */}
      <div className="bg-white border-b border-masters-pine/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/formats"
                className="p-2 hover:bg-masters-pine/5 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-masters-pine" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-masters-charcoal">
                  {format?.name || 'Scorecard'}
                </h1>
                <p className="text-sm text-masters-slate">
                  Hole {currentHole} of 18
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFormatSelector(true)}
                className="p-2 hover:bg-masters-pine/5 rounded-lg transition-colors"
                title="Change Format"
              >
                <Settings size={20} className="text-masters-pine" />
              </button>
              <button
                onClick={resetScores}
                className="p-2 hover:bg-masters-pine/5 rounded-lg transition-colors"
                title="Reset Scores"
              >
                <RotateCcw size={20} className="text-masters-pine" />
              </button>
              <button
                className="px-4 py-2 bg-masters-pine text-white rounded-lg hover:bg-masters-fairway transition-colors flex items-center gap-2"
                title="Save Scorecard"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Player Setup */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-masters-pine/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-masters-charcoal flex items-center gap-2">
              <Users size={20} />
              Players
            </h2>
            {players.length < 8 && (
              <button
                onClick={addPlayer}
                className="px-3 py-1.5 bg-masters-pine/10 hover:bg-masters-pine/20 text-masters-pine rounded-lg transition-colors flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                Add Player
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {players.map(player => (
              <div key={player.id} className="flex items-center gap-2 p-3 bg-masters-sand/20 rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-masters-pine/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-masters-pine/30"
                    placeholder="Name"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-masters-slate">HCP:</span>
                    <input
                      type="number"
                      value={player.handicap}
                      onChange={(e) => updatePlayerHandicap(player.id, parseInt(e.target.value) || 0)}
                      className="w-16 px-1 py-0.5 bg-white border border-masters-pine/20 rounded text-xs focus:outline-none focus:ring-2 focus:ring-masters-pine/30"
                      min="0"
                      max="54"
                    />
                  </div>
                </div>
                {players.length > 1 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <Minus size={16} className="text-red-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scorecard */}
        <div className="bg-white rounded-xl shadow-lg border border-masters-pine/10 overflow-hidden">
          <div className="bg-gradient-to-r from-masters-pine to-masters-fairway p-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Trophy size={20} />
                Scorecard
              </h2>
              <div className="text-sm">
                {format && <span className="bg-white/20 px-3 py-1 rounded-full">{format.category}</span>}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-masters-pine/20 bg-masters-sand/20">
                  <th className="text-left p-3 font-semibold text-masters-charcoal">Hole</th>
                  {Array.from({ length: 9 }, (_, i) => (
                    <th key={i + 1} className="text-center p-2 font-semibold text-masters-charcoal min-w-[50px]">
                      {i + 1}
                    </th>
                  ))}
                  <th className="text-center p-2 font-semibold text-masters-charcoal bg-masters-pine/10">OUT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-masters-pine/10">
                  <td className="p-3 font-medium text-masters-slate">Par</td>
                  {holes.slice(0, 9).map(hole => (
                    <td key={hole.hole} className="text-center p-2 text-masters-slate">
                      {hole.par}
                    </td>
                  ))}
                  <td className="text-center p-2 font-bold text-masters-charcoal bg-masters-pine/10">
                    {holes.slice(0, 9).reduce((sum, h) => sum + h.par, 0)}
                  </td>
                </tr>
                
                {players.map(player => (
                  <tr key={player.id} className="border-b border-masters-pine/10 hover:bg-masters-sand/10">
                    <td className="p-3 font-medium text-masters-charcoal">
                      {player.name}
                    </td>
                    {holes.slice(0, 9).map(hole => (
                      <td key={hole.hole} className="text-center p-1">
                        <input
                          type="number"
                          value={hole.scores[player.id] || ''}
                          onChange={(e) => updateScore(hole.hole, player.id, parseInt(e.target.value) || 0)}
                          className={`w-12 h-8 text-center border rounded focus:outline-none focus:ring-2 focus:ring-masters-pine/30 ${
                            hole.scores[player.id] === 0 ? 'bg-gray-50' :
                            hole.scores[player.id] < hole.par ? 'bg-green-50 border-green-300' :
                            hole.scores[player.id] > hole.par ? 'bg-red-50 border-red-300' :
                            'bg-blue-50 border-blue-300'
                          }`}
                          min="0"
                          max="20"
                          placeholder="-"
                        />
                      </td>
                    ))}
                    <td className="text-center p-2 font-bold text-masters-pine bg-masters-pine/10">
                      {holes.slice(0, 9).reduce((sum, h) => sum + (h.scores[player.id] || 0), 0) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back 9 */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-masters-pine/20 bg-masters-sand/20">
                  <th className="text-left p-3 font-semibold text-masters-charcoal">Hole</th>
                  {Array.from({ length: 9 }, (_, i) => (
                    <th key={i + 10} className="text-center p-2 font-semibold text-masters-charcoal min-w-[50px]">
                      {i + 10}
                    </th>
                  ))}
                  <th className="text-center p-2 font-semibold text-masters-charcoal bg-masters-pine/10">IN</th>
                  <th className="text-center p-2 font-semibold text-masters-charcoal bg-masters-pine/20">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-masters-pine/10">
                  <td className="p-3 font-medium text-masters-slate">Par</td>
                  {holes.slice(9, 18).map(hole => (
                    <td key={hole.hole} className="text-center p-2 text-masters-slate">
                      {hole.par}
                    </td>
                  ))}
                  <td className="text-center p-2 font-bold text-masters-charcoal bg-masters-pine/10">
                    {holes.slice(9, 18).reduce((sum, h) => sum + h.par, 0)}
                  </td>
                  <td className="text-center p-2 font-bold text-masters-charcoal bg-masters-pine/20">
                    {holes.reduce((sum, h) => sum + h.par, 0)}
                  </td>
                </tr>
                
                {players.map(player => (
                  <tr key={player.id} className="border-b border-masters-pine/10 hover:bg-masters-sand/10">
                    <td className="p-3 font-medium text-masters-charcoal">
                      {player.name}
                    </td>
                    {holes.slice(9, 18).map(hole => (
                      <td key={hole.hole} className="text-center p-1">
                        <input
                          type="number"
                          value={hole.scores[player.id] || ''}
                          onChange={(e) => updateScore(hole.hole, player.id, parseInt(e.target.value) || 0)}
                          className={`w-12 h-8 text-center border rounded focus:outline-none focus:ring-2 focus:ring-masters-pine/30 ${
                            hole.scores[player.id] === 0 ? 'bg-gray-50' :
                            hole.scores[player.id] < hole.par ? 'bg-green-50 border-green-300' :
                            hole.scores[player.id] > hole.par ? 'bg-red-50 border-red-300' :
                            'bg-blue-50 border-blue-300'
                          }`}
                          min="0"
                          max="20"
                          placeholder="-"
                        />
                      </td>
                    ))}
                    <td className="text-center p-2 font-bold text-masters-pine bg-masters-pine/10">
                      {holes.slice(9, 18).reduce((sum, h) => sum + (h.scores[player.id] || 0), 0) || '-'}
                    </td>
                    <td className="text-center p-2 font-bold text-masters-pine bg-masters-pine/20">
                      <div>{getPlayerTotal(player.id) || '-'}</div>
                      <div className="text-xs text-masters-slate">
                        {getPlayerToPar(player.id)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="p-6 bg-masters-sand/20">
            <h3 className="font-semibold text-masters-charcoal mb-4 flex items-center gap-2">
              <Target size={20} />
              Summary
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {players.map(player => {
                const total = getPlayerTotal(player.id);
                const toPar = getPlayerToPar(player.id);
                
                return (
                  <div key={player.id} className="bg-white rounded-lg p-4 border border-masters-pine/20">
                    <div className="font-semibold text-masters-charcoal mb-2">
                      {player.name}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-masters-pine">
                        {total || '-'}
                      </span>
                      <span className={`text-sm font-medium ${
                        toPar === 'E' ? 'text-blue-600' :
                        toPar.startsWith('+') ? 'text-red-600' :
                        toPar.startsWith('-') ? 'text-green-600' :
                        'text-masters-slate'
                      }`}>
                        {toPar}
                      </span>
                    </div>
                    {player.handicap > 0 && (
                      <div className="text-xs text-masters-slate mt-1">
                        Net: {total - player.handicap || '-'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Format-specific notes */}
            {format && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-masters-pine/20">
                <h4 className="font-medium text-masters-charcoal mb-2 flex items-center gap-2">
                  <Flag size={16} />
                  {format.name} Scoring
                </h4>
                <p className="text-sm text-masters-slate">
                  {format.scoring.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScorecardContent;